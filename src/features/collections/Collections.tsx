import { useQuery } from "@tanstack/react-query";
import { useService } from "../../contexts/service";
import Header from "../../layout/Header";
import EditCollection from "./EditCollection";
import { QueryKeys } from "../../constants";
import { Wrap } from "@chakra-ui/react";

const Collections: React.FC = () => {
  const { client } = useService();
  const { data: collections } = useQuery({ queryKey: [QueryKeys.COLLECTIONS], queryFn: () => client.collections.list() });

  return (
    <>
      <Header
        text="Collections"
        actions={
          <EditCollection />
        }
      />
      <Wrap>
        {collections?.map(collection => (
          <div key={collection.data.id}>
            {collection.data.name}
          </div>
        ))}
      </Wrap>
    </>
  );
};

export default Collections;
