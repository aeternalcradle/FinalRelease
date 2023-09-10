import reducer from '../../views/Login/store/reducer';

describe('reducer', () => {
    it('should return the initial state', () => {
        const initialState = {};
        const action = { type: 'UNKNOWN_ACTION' };

        const result = reducer(undefined, action);

        expect(result).toEqual(initialState);
    });

    // Add more test cases for other actions if needed
});
