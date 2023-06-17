import { MyFormData } from '@/store/reducers/formData/types';

export async function sendFormData(formData: MyFormData): Promise<Response> {
  const url = 'https://api.sbercloud.ru/content/v1/bootcamp/frontend';

  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json'
  };

  const bodyContent = JSON.stringify(formData);

  const response = await fetch(url, {
    method: 'POST',
    body: bodyContent,
    headers: headersList
  });

  return response;
}
