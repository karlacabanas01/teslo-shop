//Comienza con mayusculas por que es un functional components
import NextLink from "next/link";
import {
  AppBar,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
  Badge,
  Input,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import { ClearAllOutlined, ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UiContext } from "@/context";

export const Navbar = () => {
  const { asPath, push } = useRouter(); //Lo usaremos para margar el boton
  const { toggleSideMenu } = useContext(UiContext); //llamo a la funcion

  const router = useRouter();
  const [searchTerm, setSearchTerm ] = useState('');
  const [isSearchVisible, setIsSearchVisible ] = useState(false);

  const onSearchTerm = () => {
      if (searchTerm.trim().length === 0 ) return;
      push(`/search/${searchTerm}`);
  }



  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
          <Link display={"flex"} alignItems="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ marginLeft: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        {/* flex */}

        {/* Es como un div que nos ofrece tener acceso al tema principal de la app*/}
        <Box sx={{ display: isSearchVisible ? 'none' : { xs: "none", sm: "block" } }}>
          <NextLink href="/category/men" passHref legacyBehavior>
            <Button color={asPath === "/category/men" ? "primary" : "info"}>
              Hombres
            </Button>
          </NextLink>

          <NextLink href="/category/women" passHref legacyBehavior>
            <Button color={asPath === "/category/women" ? "primary" : "info"}>
              Mujer
            </Button>
          </NextLink>

          <NextLink href="/category/kid" passHref legacyBehavior>
            <Button color={asPath === "/category/kid" ? "primary" : "info"}>
              Niños
            </Button>
          </NextLink>
        </Box>

        <Box flex={1} />
        {/*Se mostrará en desktop y el otro en pantallas pequeñas */}

        {
          isSearchVisible
            ? (
              <Input
                  sx={{ display: { xs: "none", sm: "flex" } }}
                  className="fadeIn"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
                  type="text"
                  placeholder="Buscar..."
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => setIsSearchVisible(false)}>
                        <ClearOutlined />
                      </IconButton>
                    </InputAdornment>
                  }
            />
            )
            : (
                <IconButton
                  onClick={() => setIsSearchVisible(true)}
                  className="fadeIn"
                  sx={{ display: { xs: "none", sm: "flex" } }}
                >
                  <SearchOutlined />
                </IconButton> 
            )
        }
       
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>
        {/*----------------------------------------------------- */}
        <NextLink href="/category/men" passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
