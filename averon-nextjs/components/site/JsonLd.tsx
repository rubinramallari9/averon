import React from 'react';

/** Renders one <script type="application/ld+json"> per schema object. */
export const JsonLd = ({ data }: { data: object[] }) => (
  <>
    {data.map((d, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
    ))}
  </>
);
