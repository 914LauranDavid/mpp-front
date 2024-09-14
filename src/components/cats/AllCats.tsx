import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from "react";

import { useCatStore } from "../../stores/CatStore";
import { useAuth0 } from "@auth0/auth0-react";
import SillyLoading from "../utilities/SillyLoading";
import { ADMIN_USER_ROLE_NAME, MANAGER_USER_ROLE_NAME } from "../../utils/Constants";

const ASCENDING_SORT_DIRECTION = "asc";
const DESCENDING_SORT_DIRECTION = "desc";

function CatsTable() {
  const { user, isAuthenticated, getIdTokenClaims } = useAuth0();
  const { catsOnPage, getCount, deleteCat, fetch, getUserRoleName, buyCat } = useCatStore();
  const [isManagerOrAdmin, setIsManagerOrAdmin] = useState(false);
  
  useEffect(() => {
    console.log('will get claims');

    getIdTokenClaims().then(tokenClaims => {
      if (tokenClaims !== undefined) {
        const token = tokenClaims.__raw;

        getUserRoleName(token).then(roleName => setIsManagerOrAdmin(
          roleName === MANAGER_USER_ROLE_NAME || roleName === ADMIN_USER_ROLE_NAME
        ));
      };
    });
  }, [user]);

  const pageSize = 5;

  const [sortByNameDirection, setSortByNameDirection] = useState(ASCENDING_SORT_DIRECTION);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    getCount().then(count => setTotalCount(count))
  }, [currentPage, catsOnPage]);

  useEffect(() => {
    fetch(sortByNameDirection, currentPage);
  }, [sortByNameDirection, currentPage]);

  const handleSortByNameClick = () => {
    if (sortByNameDirection === DESCENDING_SORT_DIRECTION)
      setSortByNameDirection(ASCENDING_SORT_DIRECTION);
    else
      setSortByNameDirection(DESCENDING_SORT_DIRECTION);
  }

  const handleOnClickPrev = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleOnClickNext = () => {
    setCurrentPage(currentPage + 1);
  }

  const getSortByNameButtonOrderUiText = () => {
    if (sortByNameDirection === DESCENDING_SORT_DIRECTION)
      return " increasingly ";
    else
      return " decreasingly ";
  }

  const handleDelete = (id: number) => {
    getIdTokenClaims().then(token => {
      if (token)
        deleteCat(id, token.__raw);
    });
  }

  const handleBuy = (id: number) => {
    getIdTokenClaims().then(token => {
      if (token)
        buyCat(id, token.__raw);
    });
  }

  const min = (a: number, b: number) => {
    return (a < b ? a : b);
  }

  return (
    <div>
      <TableContainer>
        {catsOnPage.length > 0 ?
          (<Table sx={{ minWidth: "50%" }}>
            <TableHead >
              <TableRow>
                <TableCell sx={{ fontWeight: 800, }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 800, }}>Age</TableCell>
                <TableCell sx={{ fontWeight: 800, }}>Cuteness</TableCell>
                <TableCell sx={{ fontWeight: 800, }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {catsOnPage.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell sx={{ fontStyle: 'italic' }}>
                    <Link to={`/cats/${cat.id}`}>{cat.name}</Link>
                  </TableCell>
                  <TableCell>{cat.age}</TableCell>
                  <TableCell>{cat.cuteness}</TableCell>
                  <TableCell>
                    {(!(cat.ownerId) || cat.ownerId === "") && isAuthenticated &&
                      <ShoppingCartIcon
                        sx={{ cursor: 'pointer', color: 'green', marginLeft: 2, mr: 2 }}
                        onClick={() => handleBuy(cat.id)}
                        aria-label={`buyIcon${cat.id}`}
                      />
                    }
                    {isManagerOrAdmin && (
                      <>
                        <DeleteForeverIcon
                          sx={{ cursor: 'pointer', color: 'red', }}
                          onClick={() => handleDelete(cat.id)}
                          aria-label={`deleteIcon${cat.id}`}
                        />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Button onClick={() => handleSortByNameClick()}>
                    Sort {getSortByNameButtonOrderUiText()} by name
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  {currentPage > 1 && <button onClick={handleOnClickPrev}>Prev</button>}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  Page {currentPage} (cats {pageSize * (currentPage - 1) + 1}-{min(totalCount, pageSize * currentPage)}/{totalCount})
                </TableCell>
                <TableCell>
                  {pageSize * currentPage < totalCount && <button onClick={handleOnClickNext}>Next</button>}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>)
          :
          (
            <SillyLoading />
          )
        }
      </TableContainer>
    </div>
  );
}

function AllCats() {
  return (
    <Box sx={{ bgcolor: '#f8faca' }}>
      <CatsTable />
      <Divider />
    </Box>
  );
}

export default AllCats;
