

export const titleCase = (str: any) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};

export const scrollToErrorByClass = (errors: any, isObj?: boolean) => {
  let catchedInputErrorElement: HTMLElement | null = null;

  // Try to select by input[name=...]
  if (isObj) {
    catchedInputErrorElement = document.querySelector(
      `input[name=${Object.keys(errors)[0]}]`
    );
  } else {
    catchedInputErrorElement = document.querySelector(
      `input[name=${errors[0]}]`
    );
  }

  // If the element is not found, try to select by class name
  if (!catchedInputErrorElement) {
    const elements = isObj
      ? document.getElementsByClassName(Object.keys(errors)[0])
      : document.getElementsByClassName(errors[0]);

    // Ensure to access the first element from the collection
    if (elements.length > 0) {
      catchedInputErrorElement = elements[0] as HTMLElement;
    }
  }

  // Scroll to the element if it's found and is a valid HTMLElement
  if (catchedInputErrorElement && typeof catchedInputErrorElement.scrollIntoView === 'function') {
    catchedInputErrorElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'start',
    });
  } else {
    console.error('Element not found or scrollIntoView is not supported on this element');
  }
};


export const getUserFullName = (userData: any) => {
  let userFullName = userData?.attributes?.name || ""
  if (userData?.attributes?.middle_name) {
    userFullName += `${userFullName ? " " : ""}${userData?.attributes?.middle_name}`
  }
  return userFullName;
}