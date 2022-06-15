import type { Component } from "solid-js";

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
import { ProductForm } from "./ProductForm";

export const ProductModal: Component = () => {
  const { isOpen, onOpen, onClose } = createDisclosure();

  return (
    <>
      <Button colorScheme="accent" onClick={onOpen}>
        Create Product
      </Button>
      <Modal opened={isOpen()} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>New Product</ModalHeader>
          <ModalBody>
            <ProductForm />
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
