import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { isValid } from "../../misc";
import ErrorMessage from "../ErrorMessage";
import { useTranslation } from "react-i18next";

interface props {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const NewBoxModal = ({ openModal, setOpenModal }: props) => {
  const { t } = useTranslation();
  // height, depth, and length are strings not nums so inputs work better
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");
  const [comment, setComment] = useState("");

  const [error, setError] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  const addBox = () => {
    const widthNum = Number(width);
    const heightNum = Number(height);
    const depthNum = Number(depth);

    console.log("add box");
    if (!isValid(widthNum, heightNum, depthNum)) {
      console.log("not valid");
      setError(true);
      return;
    }

    console.log("add box");
    // db call to add box
    // reset values
    setWidth("");
    setHeight("");
    setDepth("");
    setComment("");

    setError(false);
    setOpenModal(false);
  };

  return (
    <>
      <Modal
        dismissible
        show={openModal}
        size="xl"
        onClose={onCloseModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {t("createBox")}
            </h3>
            {error && (
              <ErrorMessage
                title="Error while adding."
                description="Make sure all values are numbers, greater than 0, and not empty."
              />
            )}
            {/* width */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="width" value={t("width")} />
              </div>
              <TextInput
                placeholder={t("enterWidth")}
                min={0}
                max={10000}
                type="number"
                id="width"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
                required
              />
            </div>
            {/* height */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="height" value={t("height")} />
              </div>
              <TextInput
                placeholder={t("enterHeight")}
                min={0}
                max={10000}
                type="number"
                id="height"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
                required
              />
            </div>
            {/* depth */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="depth" value={t("depth")} />
              </div>
              <TextInput
                placeholder={t("enterDepth")}
                min={0}
                max={10000}
                type="number"
                id="depth"
                value={depth}
                onChange={(event) => setDepth(event.target.value)}
                required
              />
            </div>
            {/* comment */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="comment" value={t("comment")} />
              </div>
              <Textarea
                rows={5}
                id="comment"
                value={comment}
                placeholder={t("enterComment")}
                helperText={t("createBoxIdTip") + "."}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            {/* submit */}
            <div className="w-full">
              <Button onClick={addBox}>{t("add")}</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewBoxModal;
