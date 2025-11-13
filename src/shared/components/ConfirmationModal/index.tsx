import { MouseEvent } from "react";

import {
  ActionsRow,
  Description,
  ModalBody,
  ModalOverlay,
  ModalTitle,
  PrimaryButton,
  SecondaryButton,
} from "./styles";

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmationModal = ({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    <ModalOverlay role="presentation" onClick={handleOverlayClick}>
      <ModalBody role="dialog" aria-modal="true" aria-labelledby="confirmation-modal-title">
        <ModalTitle id="confirmation-modal-title">{title}</ModalTitle>

        <Description>{description}</Description>

        <ActionsRow>
          <SecondaryButton type="button" onClick={onCancel}>
            {cancelLabel}
          </SecondaryButton>

          <PrimaryButton type="button" onClick={onConfirm}>
            {confirmLabel}
          </PrimaryButton>
        </ActionsRow>
      </ModalBody>
    </ModalOverlay>
  );
};
