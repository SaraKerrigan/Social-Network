import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Avatar, Card, Flex, IconButton, TabNav } from "@radix-ui/themes";
import { Link, useLocation } from "react-router";
import { changeTheme } from "../redux/slices/themeReducer.ts";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";

export default function Header() {
  const location = useLocation();
  // location - позволяет получить доступ к информации текущей страницы (путь, домен, параметры, хэши)

  const { theme } = useAppSelector((state) => state.theme);

  const dispatch = useAppDispatch();

  return (
    <Card mb={"5"}>
      <Flex align={"center"} justify={"between"}>
        <TabNav.Root size={"2"}>
          <TabNav.Link active={location.pathname === "/"} asChild>
            {/* location.pathname - получает путь */}
            <Link to={"/"}> Home</Link>
          </TabNav.Link>
          <TabNav.Link active={location.pathname === "/favorites"} asChild>
            <Link to={"/favorites"}>Favorites</Link>
          </TabNav.Link>
        </TabNav.Root>
        <Flex gap={"4"}>
          <Link to={`/profile/1`}>
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="A"
            />
          </Link>
          <IconButton size={"3"} onClick={() => dispatch(changeTheme())}>
            {theme === "light" ? (
              <MoonIcon width="18" height="18" />
            ) : (
              <SunIcon width="18" height="18" />
            )}
          </IconButton>
        </Flex>
      </Flex>
    </Card>
  );
}
