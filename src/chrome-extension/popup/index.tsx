import { Action, CustomMessage } from "../../types";
import "../global.css";
import { ChangeEvent, useEffect, useState } from "react";

export const Popup = () => {
  const [links, setLinks] = useState(new Array<string>());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredLinks, setFilteredLinks] = useState(new Array<string>());

  function handleGitLinks(links: Array<string>) {
    const data: Array<string> = links;
    setLinks(data);
    setFilteredLinks(data);
  };

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = links.filter(link => link.toLowerCase().includes(term));

    setFilteredLinks(filtered);
  }

  useEffect(() => {
    chrome.runtime.sendMessage<CustomMessage>({
      action: Action.GET_LINKS,
    }).then((val: Array<string>) => {
      handleGitLinks(val);
    });
  }, []);

  return (
    <div className="p-3 h-full bg-slate-700">
      <p className="text-white font-extrabold">{filteredLinks.length} git links found</p>
      <input
        type="text"
        placeholder="Search..."
        className="p-1 w-full border border-black-900"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="border border-slate-400">
        {filteredLinks.map((link, index) => (
          <p key={index} className="text-white p-2 border-b border-slate-400">
            <a href={link} target="_blank">{link}</a>
          </p>
        ))}
      </div>
    </div>
  );
};
