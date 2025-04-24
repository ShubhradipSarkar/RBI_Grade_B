'use client';
import { useState } from 'react';
import { VscFoldDown, VscFoldUp } from 'react-icons/vsc';
import contentData from './data/managementContent.json';

export default function Home() {
  const [mgmt, setMgmt] = useState(false);
  const [openSubtopics, setOpenSubtopics] = useState({});
  const [openSubcategories, setOpenSubcategories] = useState({});

  const toggleSubtopic = (index) => {
    setOpenSubtopics((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleSubcategory = (subId) => {
    setOpenSubcategories((prev) => ({
      ...prev,
      [subId]: !prev[subId]
    }));
  };

  return (
    <div className="flex flex-col gap-4 p-8 max-w-4xl mx-auto">
      <button
        onClick={() => setMgmt(!mgmt)}
        className="w-full text-blue-500 font-semibold px-6 py-3 rounded-lg shadow-md flex items-center justify-between"
      >
        <span>Finance</span>
        {0 ? <VscFoldUp className="text-xl" /> : <VscFoldDown className="text-xl" />}
      </button>
      <button
        onClick={() => setMgmt(!mgmt)}
        className="w-full text-blue-500 font-semibold px-6 py-3 rounded-lg shadow-md flex items-center justify-between"
      >
        <span>Management</span>
        {mgmt ? <VscFoldUp className="text-xl" /> : <VscFoldDown className="text-xl" />}
      </button>

      {mgmt && (
        <div className="flex flex-col gap-4">
          {contentData.map((topic, index) => (
            <div key={index}>
              <button
                onClick={() => toggleSubtopic(index)}
                className="w-full bg-blue-200 text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-md flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>{index + 1}.</span>
                  <span>{topic.title}</span>
                </div>
                {openSubtopics[index] ? <VscFoldUp className="text-xl" /> : <VscFoldDown className="text-xl" />}
              </button>

              {openSubtopics[index] && (
                <div className="flex flex-col gap-2 mt-2 ">
                  {topic.subcategories.map((sub, subIndex) => {
                    const subId = `${index}-${subIndex}`;
                    return (
                      <div key={subIndex}>
                        <button
                          onClick={() => toggleSubcategory(subId)}
                          className="w-full bg-red-200 text-blue-800 font-semibold px-4 py-2 rounded-lg shadow-md flex items-center justify-between"
                        >
                          <span>{sub.title}</span>
                          {openSubcategories[subId] ? (
                            <VscFoldUp className="text-xl" />
                          ) : (
                            <VscFoldDown className="text-xl" />
                          )}
                        </button>

                        {openSubcategories[subId] && (
                          <div className="mt-2 flex flex-col gap-2 ">
                            {sub.paragraphs.map((para, pIndex) => (
                              <div
                                key={pIndex}
                                className="bg-blue-100 px-4 py-2 rounded-md text-black shadow-inner text-sm"
                                dangerouslySetInnerHTML={{ __html: para }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
