import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import React from "react";

interface LoaderOverlayProps {
  message?: React.ReactNode;
}

const LoaderOverlay: React.FC<LoaderOverlayProps> = ({ message }) => {
  const messageRef = React.useRef<HTMLParagraphElement>(null);

  return (
    <Modal
      isOpen
      closeOnEsc={false}
      closeOnOverlayClick={false}
      onClose={() => {}}
      initialFocusRef={messageRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody display="flex" flexDirection="column" alignItems="center">
          <Spinner />
          <p tabIndex={-1} ref={messageRef}>
            {message || "Loading..."}
          </p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoaderOverlay;
