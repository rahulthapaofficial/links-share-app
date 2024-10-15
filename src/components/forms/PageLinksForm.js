"use client";
import SectionBox from "@/components/layout/SectionBox";
import {
  faCloudArrowUp,
  faGripLines,
  faLink,
  faPlusCircle,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { savePageLinks } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageLinksForm({ page, user }) {
  const [links, setLinks] = useState(page.links || []);
  async function save() {
    await savePageLinks(links);
    toast.success("Saved!");
  }

  function addNewLink() {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: "",
          subtitle: "",
          icon: "",
          link: "",
        },
      ];
    });
  }
  function handleLinkChange(keyOfLinkToChange, prop, ev) {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return [...prev];
    });
  }
  function removeLink(linkKeyToRemove) {
    setLinks((prevLinks) =>
      [...prevLinks].filter((link) => link.key !== linkKeyToRemove)
    );
  }
  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="text-blue-500 text-lg flex gap-2 items-center"
        >
          <FontAwesomeIcon className="" icon={faPlusCircle} />
          <span>Add New</span>
        </button>
        <div>
          <ReactSortable handle={".handle"} list={links} setList={setLinks}>
            {links.map((link) => (
              <div key={link.key} className="flex mt-8 gap-6 items-center">
                <div className="handle">
                  <FontAwesomeIcon
                    icon={faGripLines}
                    className="text-gray-500 mr-2 cursor-grab"
                  />
                </div>
                <div className="text-center">
                  <div className="bg-gray-300 p-4 rounded-full inline-block mb-2">
                    <FontAwesomeIcon icon={faLink} />
                  </div>
                  <div>
                    {/* <input
                      onChange={(ev) => handleUpload(ev, link.key)}
                      id={"icon" + link.key}
                      type="file"
                      className="hidden"
                    />
                    <label
                      htmlFor={"icon" + link.key}
                      className="border mt-2 p-2 flex items-center gap-1 text-gray-600 cursor-pointer mb-2 justify-center"
                    >
                      <FontAwesomeIcon icon={faCloudArrowUp} />
                      <span>Change icon</span>
                    </label> */}
                    <button
                      onClick={() => removeLink(link.key)}
                      type="button"
                      className="w-full bg-red-500 text-white py-2 px-3 mb-2 h-full flex gap-2 items-center justify-center rounded-md"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Remove this link</span>
                    </button>
                  </div>
                </div>
                <div className="grow">
                  <label className="input-label">Title:</label>
                  <input
                    value={link.title}
                    onChange={(ev) => handleLinkChange(link.key, "title", ev)}
                    type="text"
                    placeholder="Title"
                  />
                  <label className="input-label">Subtitle:</label>
                  <input
                    value={link.subtitle}
                    onChange={(ev) =>
                      handleLinkChange(link.key, "subtitle", ev)
                    }
                    type="text"
                    placeholder="Subtitle (Optional)"
                  />
                  <label className="input-label">URL:</label>
                  <input
                    value={link.url}
                    onChange={(ev) => handleLinkChange(link.key, "url", ev)}
                    type="text"
                    placeholder="Url"
                  />
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="border-t pt-4 mt-4">
          <SubmitButton className="max-w-xs mx-auto">
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
