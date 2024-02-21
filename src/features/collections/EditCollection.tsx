import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { BiPlusCircle } from "react-icons/bi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Collection, Sharing } from "../../types";
import SkillsInput from "../../components/SkillsInput";

interface EditCollectionProps {
  collection?: Collection;
}

interface FormData {
  name: string;
  description: string;
  sharing: Sharing;
  skills: string[];
}

const EditCollection: React.FC<EditCollectionProps> = ({ collection }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
    reset
  } = useForm<FormData>({
    defaultValues: {
      name: collection?.name || "",
      description: collection?.description || "",
      sharing: collection?.sharing || Sharing.Private,
    },
  });

  const onSave: SubmitHandler<FormData> = (data) => {
    console.log(data);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Add Collection"
        icon={<Icon boxSize={6} as={BiPlusCircle} />}
        variant="ghost"
        colorScheme="blue"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {collection ? "Edit Collection" : "Add Collection"}
          </ModalHeader>
          <ModalCloseButton disabled={isSubmitting} />
          <ModalBody>
            <form onSubmit={handleSubmit(onSave)}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.name} isRequired>
                  <FormLabel htmlFor="collection-name">Name</FormLabel>
                  <Input
                    id="collection-name"
                    {...register("name", {
                      required: "A name is required",
                    })}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="collection-description">
                    Description
                  </FormLabel>
                  <Textarea
                    id="collection-description"
                    {...register("description")}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="collection-skills">Skills</FormLabel>
                  <Controller
                    control={control}
                    name="skills"
                    render={({ field }) => (
                      <SkillsInput {...field} />
                    )}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="collection-sharing">Sharing</FormLabel>
                  <Select {...register("sharing")}>
                    <option value={Sharing.Private}>Private</option>
                    <option value={Sharing.Public}>Public</option>
                  </Select>
                </FormControl>
              </VStack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button disabled={isSubmitting} variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit(onSave)}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCollection;
