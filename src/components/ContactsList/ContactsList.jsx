import { useEffect } from 'react';
import { Span, DeleteItem } from './ContactList.styled';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectContacts,
  selectFilter,
  selectIsLoading,
} from 'components/Redux/selectors';
import {
  deleteContact,
  fetchContacts,
} from 'components/Redux/contacts/operations';
import Loader from 'components/Loader/Loader';

const ContactsList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = id => dispatch(deleteContact(id));

  const filtered = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );

  return (
    <div>
      {isLoading && <Loader />}
      {filtered?.length > 0 && (
        <ul>
          {filtered.map(({ id, name, phone }) => (
            <li key={id}>
              <Span>
                {name}: {phone}
              </Span>
              <DeleteItem onClick={() => handleDelete(id)} type="button">
                Delete
              </DeleteItem>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactsList;
