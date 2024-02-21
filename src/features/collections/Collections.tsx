import Header from "../../layout/Header";
import EditCollection from "./EditCollection";

const Collections: React.FC = () => {
  return (
    <>
      <Header
        text="Collections"
        actions={
          <EditCollection />
        }
      />
    </>
  );
};

export default Collections;
