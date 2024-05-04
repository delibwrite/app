import { useQuery } from "@tanstack/react-query";
import { useService } from "../../contexts/service";
import Header from "../../layout/Header";
import EditCollection from "./EditCollection";
import { QueryKeys } from "../../constants";
import { Card, CardHeader, Heading, LinkOverlay, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
      <SimpleGrid padding={4} spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {collections?.map(collection => (
          <Card key={collection.data.id}>
            <CardHeader>
              <Heading size="sm">
                <LinkOverlay as={Link} to={`/collections/${collection.data.id}`}>
                  {collection.data.name}
                </LinkOverlay>
              </Heading>
            </CardHeader>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Collections;
