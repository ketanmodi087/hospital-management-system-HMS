
import React from "react";

const VoiceOfCustomer = () => {
  const svgString = `
<svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.582 7.74805L18.9996 7.70582" stroke="#787486" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.582 5.31445L21.25 5.31445" stroke="#787486" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.62613 8.82353C6.5473 8.81471 6.4527 8.81471 6.36599 8.82353C4.48986 8.75297 3 7.03303 3 4.91617C3 2.75522 4.56081 1 6.5 1C8.43131 1 10 2.75522 10 4.91617C9.99212 7.03303 8.50225 8.75297 6.62613 8.82353Z" stroke="#787486" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.59677 12.4818C0.467742 14.1617 0.467742 16.8993 2.59677 18.5688C5.01613 20.4768 8.98387 20.4768 11.4032 18.5688C13.5323 16.8889 13.5323 14.1513 11.4032 12.4818C8.99267 10.5842 5.02493 10.5842 2.59677 12.4818Z" stroke="#787486" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 8.57124L14.5 6.49982L14.6009 4.02856C14.6227 3.49258 15.0636 3.06934 15.6 3.06934H22C22.5523 3.06934 23 3.51705 23 4.06934V8.99981C23 9.5521 22.5523 9.99981 22 9.99981H15.64C15.0877 9.99981 14.64 9.5521 14.64 8.99981V8.57124H12Z" stroke="#787486"/>
</svg>`;

  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
};

export default VoiceOfCustomer;
