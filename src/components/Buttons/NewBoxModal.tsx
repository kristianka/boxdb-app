import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { isValid } from "../../misc";
import ErrorMessage from "../ErrorMessage";

interface props {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const NewBoxModal = ({ openModal, setOpenModal }: props) => {
  // height, depth, and length are strings not nums so inputs work better
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");
  const [length, setLength] = useState("");
  const [comment, setComment] = useState("");

  const [error, setError] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  const addBox = () => {
    const heightNum = Number(height);
    const depthNum = Number(depth);
    const lengthNum = Number(length);

    console.log("add box");
    if (!isValid(heightNum, depthNum, lengthNum)) {
      console.log("not valid");
      setError(true);
      return;
    }

    console.log("add box");
    // db call to add box
    // reset values
    setHeight("");
    setDepth("");
    setLength("");
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
              Create a new box
            </h3>
            {error && (
              <ErrorMessage
                title="Error while adding."
                description="Make sure all values are numbers, greater than 0, and not empty."
              />
            )}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="height" value="Height" />
              </div>
              <TextInput
                placeholder="Enter height"
                min={0}
                max={10000}
                type="number"
                id="height"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="depth" value="Depth" />
              </div>
              <TextInput
                placeholder="Enter depth"
                min={0}
                max={10000}
                type="number"
                id="depth"
                value={depth}
                onChange={(event) => setDepth(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="length" value="Length" />
              </div>
              <TextInput
                placeholder="Enter length"
                min={0}
                max={10000}
                type="number"
                id="length"
                value={length}
                onChange={(event) => setLength(event.target.value)}
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Comment" />
              </div>
              <Textarea
                rows={5}
                id="comment"
                value={comment}
                placeholder="Comment is optional"
                helperText="ID of the box is generated automatically."
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Button onClick={addBox}>Add</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewBoxModal;
