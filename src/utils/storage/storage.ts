export const storage = {
  formData: 'forms-app-formData',
  formCurrentStep: 'forms-app-formCurrentStep'
};

export const storageGetItem = (storageItem: string) => {
  try {
    const response = localStorage.getItem(storageItem);
    if (response) {
      return JSON.parse(response);
    }
  } catch (error) {
    console.log(error);
  }
};

export const storageSetItem = (storageItem: string, value: unknown) => {
  try {
    localStorage.setItem(storageItem, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const clearLocalStorageData = async (storageNames: typeof storage) => {
  Object.values(storageNames).forEach((value) => {
    localStorage.removeItem(value);
  });
};
