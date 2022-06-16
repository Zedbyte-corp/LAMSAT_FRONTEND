import React from 'react';
import { Result } from 'antd';

class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Result
          status="500"
          title="Something went wrong"
          subTitle="Sorry, We will fix this as soon as possible."
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
