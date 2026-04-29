import * as React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      console.log(this.state.errorInfo);
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>Please make a bug report somewhere =)</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
