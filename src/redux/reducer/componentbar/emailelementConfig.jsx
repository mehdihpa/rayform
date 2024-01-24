const initialState = {
  element: [],
};

const emailementConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case "emailConfig":
      const {
        uuid,
        label,
        type,
        description,
        placeHolder,
        bgColor,
        textColor,
        textSize,
        mapPath,
        urlTable,
      } = action.data;

      // Filter out empty objects from the existing elements
      const validElements = state.element.filter(
        (el) => Object.keys(el).length > 0
      );

      // Check if the element with the same UUID already exists
      const existingElementIndex = validElements.findIndex(
        (el) => el.uuid === uuid
      );

      if (existingElementIndex !== -1) {
        // If exists, update the label value without replacing
        return {
          ...state,
          element: validElements.map((el, index) =>
            index === existingElementIndex
              ? {
                  ...el,
                  label: label,
                  description: description,
                  placeHolder: placeHolder,
                  bgColor: bgColor,
                  textColor: textColor,
                  textSize: textSize,
                  type: type,
                  mapPath: mapPath,
                  urlTable: urlTable,
                }
              : el
          ),
        };
      } else {
        // If doesn't exist, add the new element
        return {
          ...state,
          element: [
            ...validElements,
            {
              uuid,
              label,
              type,
              description,
              placeHolder,
              bgColor,
              textColor,
              textSize,
              mapPath,
              urlTable,
            },
          ],
        };
      }

    case "deleteElement":
      const deleteUuid = action.uuid;

      // Filter out the element with the specified UUID
      const updatedElements = state.element.filter(
        (el) => el.uuid !== deleteUuid
      );

      return {
        ...state,
        element: updatedElements,
      };

    default:
      return state;
  }
};

export default emailementConfigReducer;
