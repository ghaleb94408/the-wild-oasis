import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Row from "./ui/Row";
function App() {
  return (
    <>
      <GlobalStyles />
      <Row>
        <Row type="horizontal">
          <Heading as="h1">The Wild Oasis!</Heading>
          <div>
            <Heading as="h2">Check in & Out!</Heading>
            <Button variation='secondary' size='large'>Check In</Button>
            <Button variation="primary" size="medium">
              Check Out
            </Button>
          </div>
        </Row>
        <Row>
          <Heading as="h3">Forms!</Heading>
          <Button>Hello World!</Button>
        </Row>
      </Row>
    </>
  );
}

export default App;
