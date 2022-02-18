import TodoList from "./TodoList";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";

function App() {
  const theme = useTheme();
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ height: "100vh" }}>
          <TodoList />
        </Box>
      </Container>
    </>
  );
}

export default App;
