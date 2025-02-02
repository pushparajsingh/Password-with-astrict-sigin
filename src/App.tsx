import React, { ChangeEvent, MouseEvent } from 'react';
import logo from './logo.svg';
import './App.css';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface AppState {
  password: string;
  astrickPassword: string;
  showPassword: boolean;
}

interface AppProps {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      password: '',
      astrickPassword: '',
      showPassword: false,
    };
  }

  handleChange =
    (prop: keyof AppState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { password } = this.state;
      const inputValue = event.target.value;

      const updatePassword = (
        str: string,
        event: ChangeEvent<HTMLInputElement>
      ) => {
        const inputData = (event.nativeEvent as InputEvent).data;

        if (inputData) {
          let updatedStr = str.split('');
          updatedStr.splice(
            event.target.selectionStart as number,
            0,
            inputData
          );
          return updatedStr.join('');
        } else {
          let updatedStr = str.split('');
          updatedStr.splice(event.target.selectionStart as number, 1);
          return updatedStr.join('');
        }
      };

      const createAsteriskMask = (str: string) =>
        '*'.repeat(str.length);

      const updatedPassword = updatePassword(password, event);

      const shouldUseInputValue =
        inputValue.length !== updatedPassword.length &&
        !inputValue.includes('*');

      const finalPassword = shouldUseInputValue
        ? inputValue
        : updatedPassword;
      const maskedPassword = createAsteriskMask(finalPassword);

      this.setState(
        (prevState) =>
          ({
            ...prevState,
            [prop]: finalPassword,
            astrickPassword: maskedPassword,
          } as Pick<AppState, keyof AppState>)
      );
    };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  render() {
    const { password, astrickPassword, showPassword } = this.state;
    console.log('password', this.state.password);
    return (
      <div className="App">
        <FormControl variant="outlined" style={{ marginTop: '20px' }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            value={showPassword ? password : astrickPassword}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </div>
    );
  }
}

export default App;
