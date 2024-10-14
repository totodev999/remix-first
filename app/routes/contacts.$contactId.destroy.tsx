import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';

import { deleteContact } from '../data';

// Important: file name is really important, if name this file contacts.$contactId_.destroy.tsx and quit redirecting.
// Then, you will see empty white page at right side of the screen.
// But, if you name this file contacts.$contactId.destroy.tsx, then you will see 404 error.
// The cause of this is that contacts.$contactId_.destroy.tsx is reagarded as a new path(contacts/:id/destroy),
// but contacts.$contactId.destroy.tsx is regarded as a part of contacts/id .
// So, contacts.$contactId.tsx will run and you already deleted id specified in URL, then nothing will be found.
export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.contactId, 'Missing contactId param');
  await deleteContact(params.contactId);
  return redirect('/');
};
