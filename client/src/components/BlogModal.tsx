import {
  Button,
  createDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  VStack,
} from "@hope-ui/solid";
import { BlogForm } from "./BlogForm";

export const BlogModal = () => {
  const { isOpen, onOpen, onClose } = createDisclosure();

  return (
    <>
      <Button colorScheme="accent" onClick={onOpen}>
        Create Draft
      </Button>
      <Modal opened={isOpen()} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>New Draft</ModalHeader>
          <ModalBody>
            <BlogForm />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="accent" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
