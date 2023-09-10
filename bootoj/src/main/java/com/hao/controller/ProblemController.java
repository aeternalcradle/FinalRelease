package com.hao.controller;

import com.hao.pojo.*;
import com.hao.pojo.judge.Commit;
import com.hao.service.ProblemService;
import com.hao.service.UserAnswerService;
import com.hao.util.HttpBodyHandlerUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.*;


@Controller
@RequestMapping("/oj")
@CrossOrigin
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    @Autowired
    private UserAnswerService userAnswerService;

    @PostMapping("/all")
    @ResponseBody
    public List<Problem> queryAllList() {
        return problemService.queryAllList();
    }

    @RequestMapping("/toDo")
    public String toOne(Integer id) {
        return "forward:/html/doProblem.html";
    }

    @RequestMapping("/one")
    @ResponseBody
    public String queryOneList(Integer id) {
        return HttpBodyHandlerUtils.pojoToString(problemService.queryOne(id));
    }

    @PostMapping("/my")
    @ResponseBody
    public List<MyProblem> getMyProblem(String user_name) {
        return  userAnswerService.getMyAnswer(user_name);
    }
    @PostMapping("/compile")
    @ResponseBody
    public String compileAndRun(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        // 1.读取请求的body的所有数据
        String body = HttpBodyHandlerUtils.readBody(req);
        System.out.println("user_compile: \n" + body);

// 2. 按照API约定的格式来解析json数据，得到CompileRequest对象
        CompileRequest compileRequest = HttpBodyHandlerUtils.stringToPojo(body, CompileRequest.class);

// 3. 按照id从数据库中读取出对应的测试用例代码
        Problem problem = problemService.queryOne(compileRequest.getId());
        System.out.println("body" + body);
        System.out.println("request:" + compileRequest);
        System.out.println("id:" + compileRequest.getId());
        System.out.println("problem:" + problem);

// 4. 获取问题的所有测试样例
        List<TestCase> testcases = problemService.getTestCaseByProblemId(problem.getId());

        WebClient webClient = WebClient.create();

        List<String> tokens = new ArrayList<>();
        int test_size = testcases.size();

// 创建线程池
        ExecutorService executorService = Executors.newFixedThreadPool(10);

// 创建任务列表
        List<Callable<String>> tasks = new ArrayList<>();

// 对每个测试样例创建任务
        for (TestCase testcase : testcases) {
            Callable<String> task = () -> {
                Commit commit = new Commit(compileRequest.getLanguage_id(), compileRequest.getCode(), testcase.getTestIn(), testcase.getTestOut(), 10, 4096);
                String requestBody = HttpBodyHandlerUtils.pojoToString(commit);
                System.out.println("testcase" + testcase.getTestIn());
                System.out.println("测试用例" + requestBody);
                System.out.println(requestBody);

                // 评测请求的URL
                String url = "http://121.36.214.230:2358/submissions";

                Mono<String> response = webClient.post()
                        .uri(url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromValue(requestBody))
                        .retrieve()
                        .bodyToMono(String.class);

                return response.flatMap(json -> {
                    int start = json.indexOf("'");
                    int end = json.length() - 2;
                    String token = "";
                    if (end > 10) {
                        token = json.substring(10, end);
                        tokens.add(token);
                    }

                    // 处理评测结果
                    // ...

                    return Mono.just(token);
                }).block(); // 阻塞并获取最终结果
            };

            tasks.add(task);
        }

// 执行任务并获取结果
        List<Future<String>> futures = new ArrayList<>();
        try {
            futures = executorService.invokeAll(tasks);
        } catch (InterruptedException e) {
            // 处理异常
            e.printStackTrace();
        } finally {
            // 关闭线程池
            executorService.shutdown();
        }


// 等待所有任务完成
        for (Future<String> future : futures) {
            try {
                future.get();
            } catch (InterruptedException | ExecutionException e) {
                // 处理异常
                e.printStackTrace();
            }
        }
        System.out.println("线程池结束tokens："+tokens);



        /*Random random = new Random();
        int min = 3000;
        int max = 8000;
        int randomNumber = random.nextInt(max - min + 1) + min;*/
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 创建一个 RestTemplate 实例
        RestTemplate restTemplate = new RestTemplate();

        // 创建一个 HttpHeaders 对象，设置请求头（可选）
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");

        int testindex = 0;
        ResponseEntity<Answer> lastAcceptedAnswer = null;

        // 创建一个锁对象
        Object lock = new Object();

        for (String token : tokens) {
            ResponseEntity<Answer> response;

            // 同步访问和修改lastAcceptedAnswer
            synchronized (lock) {
                response = restTemplate.exchange(
                        "http://121.36.214.230:2358/submissions/" + token,
                        HttpMethod.GET,
                        new HttpEntity<>(headers),
                        Answer.class,
                        token
                );
            }

            testindex++;

            Answer answer = response.getBody();
            if (answer != null && answer.getStatus() != null) {
                if (!"Accepted".equals(answer.getStatus().getDescription())) {
                    String responseString = HttpBodyHandlerUtils.pojoToString(answer).trim();
                    if (responseString.endsWith("}")) {
                        responseString = responseString.substring(0, responseString.length() - 1);
                    }
                    // 如果description不为"Accepted"，返回当前请求得到的结果
                    testindex--;
                    userAnswerService.updateUserAnswer(compileRequest.getUser_name(), compileRequest.getId(), 0);

                    return (responseString + ",  \"nums\": " + testindex + ",  \"size\": " + test_size + "}");
                }

                // 同步访问和修改lastAcceptedAnswer
                synchronized (lock) {
                    lastAcceptedAnswer = response;
                }
            }
        }

        String last_response = null;
        // 同步访问lastAcceptedAnswer
        synchronized (lock) {
            if (lastAcceptedAnswer != null) {
                last_response = HttpBodyHandlerUtils.pojoToString(lastAcceptedAnswer.getBody());
                if (last_response.endsWith("}")) {
                    last_response = last_response.substring(0, last_response.length() - 1);
                }
            }
        }

        userAnswerService.updateUserAnswer(compileRequest.getUser_name(), compileRequest.getId(), 1);

        // 返回最后一个请求得到的结果（即使是"Accepted"）
        return lastAcceptedAnswer != null ? (last_response + ",  \"nums\": " + testindex + ",  \"size\": " + test_size + "}") : null;

    }

// 延迟5秒钟后再发送请求

}
