import React from 'react';
import '../styles/TableOfContents.scss';


interface TOCItem {
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index} style={{ marginLeft: item.level * 20 }}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default TableOfContents;
