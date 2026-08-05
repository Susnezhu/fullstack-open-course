import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInForm from '../../components/SingIn/SignInForm';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {

      const onSubmit = jest.fn();

      const { getByTestId } = await render(
        <SignInForm onSubmit={onSubmit} />
      );

      const usernameInput = getByTestId('usernameInput');
      const passwordInput = getByTestId('passwordInput');
      const submitButton = getByTestId('submitButton');

      fireEvent.changeText(usernameInput, 'kalle');
      fireEvent.changeText(passwordInput, 'password');

      await waitFor(() => {
        expect(usernameInput.props.value).toBe('kalle');
        expect(passwordInput.props.value).toBe('password');
      });

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled();
      });

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password',
      });
    });
  });
});