import { PlatformUser, usersApi } from "@commerce/api";
import { Button, Heading, Text } from "@commerce/ui";
import { useQuery } from "@tanstack/react-query";
import "./styles.css";
export default function App() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({ queryKey: ["users"], queryFn: usersApi.getAll });
  return (
    <section className="remote-panel">
      <div className="remote-heading">
        <div>
          <Text className="eyebrow">TEAM DIRECTORY</Text>
          <Heading level={2}>Users</Heading>
        </div>
        <Button>Invite user</Button>
      </div>
      {isLoading && <Text>Loading team...</Text>}
      {isError && <Text>Unable to load team members.</Text>}
      <div className="user-list">
        {data.map((user: PlatformUser) => (
          <article className="user-row" key={user.id}>
            <div className="avatar">
              {user.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <div>
              <Text className="product-name">{user.name}</Text>
              <Text className="muted">{user.email}</Text>
            </div>
            <span className="role">{user.role}</span>
            <span className="status">{user.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
