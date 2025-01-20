import styled from "@emotion/styled";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { Emoji } from "emoji-picker-react";
import React, { ErrorInfo } from "react";
import { TaskIcon } from ".";
import { UserContext } from "../contexts/UserContext";
import { showToast } from "../utils";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  openClearDialog: boolean;
}

/**
 * ErrorBoundary component that catches and displays errors.
 */

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static contextType = UserContext;
  declare context: React.ContextType<typeof UserContext>;
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      openClearDialog: false,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: error,
      openClearDialog: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    // This fixes issues with caching where dynamically imported modules fail to load due to changed asset names in new builds.
    if (
      error.message.includes("Failed to fetch dynamically imported") ||
      error.message.includes("is not a valid JavaScript")
    ) {
      showToast("Reloading page", { type: "loading" });

      const retries = parseInt(sessionStorage.getItem("reload_retries") || "0", 10);

      if (retries < 3) {
        setTimeout(() => {
          sessionStorage.setItem("reload_retries", String(retries + 1));
          location.reload();
        }, 1000);
      }
    }
  }

  handleOpenDialog = () => {
    this.setState({ openClearDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openClearDialog: false });
  };

  handleConfirmClearData = () => {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <ErrorHeader>
            <span>Oops! An error occurred.&nbsp;</span>
            <span>
              <Emoji size={38} unified="1f644" />
            </span>
          </ErrorHeader>
          <ErrorIconContainer>
            <TaskIcon scale={0.6} variant="error" />
          </ErrorIconContainer>
          <h3>
            <span style={{ color: "#ff3131", display: "inline-block" }}>
              <ErrorOutlineRounded sx={{ verticalAlign: "middle", mb: "4px" }} /> ERROR:
            </span>{" "}
            <span translate="no">
              [{this.state.error?.name}] {this.state.error?.message}
            </span>
          </h3>
        </Container>
      );
    }

    return this.props.children;
  }
}

const Container = styled.div`
  margin: 0 8vw;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const ErrorIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px;
`;

const ErrorHeader = styled.h1`
  margin-top: 32px;
  margin-bottom: 32px;
  font-size: 36px;
  color: #ff3131;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    text-align: left;
    justify-content: left;
    font-size: 30px;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export default ErrorBoundary;
