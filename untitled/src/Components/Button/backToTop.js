import React, { useEffect } from 'react';
import {ArrowUpOutlined} from "@ant-design/icons";

const YourComponent = () => {
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const backButton = document.getElementById('back-to-top-button');
            if (backButton) {
                backButton.style.display = scrollTop > 300 ? 'block' : 'none';
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="container">
            <button className="scroll-to-top-button"
                onClick={scrollToTop}
            >
                <ArrowUpOutlined/>
            </button>
        </div>
    );
};

export default YourComponent;
