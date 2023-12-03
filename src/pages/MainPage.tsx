import { useAppSelector } from '../store/hooks';
import { ModifiedFormData } from '../types/common';

const MainPage = () => {
  const { form } = useAppSelector((state) => state.form);

  return (
    <>
      <h1>Main Page</h1>
      <ul>
        {form.map((item: ModifiedFormData, idx) => (
          <li key={idx}>
            <img
              src={item.userImage}
              style={{ objectFit: 'cover' }}
              width="200px"
              height="200px"
              alt={item.name}
            />
            {item.name}, {item.age}, {item.country}, {item.email}, {item.gender}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MainPage;
