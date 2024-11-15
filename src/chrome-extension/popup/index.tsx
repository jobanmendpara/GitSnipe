import clsx from "clsx";
import { Action, CustomMessage } from "../../types";
import "../global.css";
import { ChangeEvent, useEffect, useState } from "react";
import { extractRepo } from "../../utils";

export const Popup = () => {
  const [activeIndex, _setActiveIndex] = useState(0);
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
    <div className="p-3 h-full bg-background">
      <p
        className={clsx(filteredLinks.length > 0 ? 'text-green-500' : 'text-red-500', 'font-extrabold')}
      >
        {filteredLinks.length} gits found
      </p>
      <input
        type="text"
        placeholder="Search..."
        className="p-1 text-background w-full border border-border"
        value={searchTerm}
        onChange={handleSearch}
        autoFocus={true}
      />
      {filteredLinks.map((link, index) => (
        <a
          href={link}
          target="_blank"
        >
          <div
            key={link}
            className={clsx(
              index === activeIndex ? 'bg-slate-700' : '',
              'text-white p-2'
            )}
          >
            <p>{extractRepo(link)}</p>
          </div>
        </a>
      ))}
    </div>
  );
};
