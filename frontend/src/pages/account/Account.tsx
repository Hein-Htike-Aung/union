import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import DataTable from "../../DataTable";
import { getUsers } from "../../services";
import { ActionButton } from "./ActionButton";

const Account = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");

  const userFilterQuery = useQuery(
    ["users", "filter", page, pageSize, search],
    () => getUsers({ page, pageSize, search }),
    {
      enabled: isSearching,
    }
  );

  const userQuery = useQuery(
    ["users", page, pageSize],
    () => getUsers({ page, pageSize }),
    {
      enabled: !isSearching,
    }
  );
  function pageSizeChangeHandler(rows: number) {
    setPageSize(rows);
  }
  function pageChangeHandler(newPage: number) {
    setPage(newPage);
  }
  const totalCount = parseInt(
    (isSearching
      ? userFilterQuery.data?.data.count + ""
      : userQuery.data?.data.count + "") || "0"
  );

  function searchHandler(term: string) {
    setPage(1);
    setSearch(term);
    setIsSearching(true);
  }

  function resetBtnClickCallback() {
    setIsSearching(false);
  }

  const data =
    (isSearching
      ? userFilterQuery.data?.data.users?.map((user: User) => ({
          ...user,
          townshipName: user?.township?.township,
          districtName: user?.township?.district?.district,
          stateName: user?.township?.district.state.state,
        }))
      : userQuery.data?.data.users?.map((user: User) => ({
          ...user,
          townshipName: user?.township?.township,
          districtName: user?.township?.district?.district,
          stateName: user?.township?.district.state.state,
        }))) || [];

  const columns = [
    {
      name: "username",
      label: "Name",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "townshipName",
      label: "Township",
    },
    {
      name: "stateName",
      label: "State",
    },
    {
      name: "districtName",
      label: "District",
    },
    {
      name: "id",
      label: "Action",
      options: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        customBodyRender: (value: number, tableMeta: any) => {
          return <ActionButton id={value} user={data[tableMeta.rowIndex]} />;
        },
      },
    },
  ];
  return (
    <div className="px-4 py-2">
      <SearchSection
        searchHandler={searchHandler}
        resetHandler={resetBtnClickCallback}
        isSearching={isSearching}
      />
      <DataTable
        title={"Account List"}
        data={data}
        columns={columns}
        options={{
          serverSide: true,
          count: totalCount,
          page: page - 1,
          rowsPerPage: pageSize,
          onTableChange: (action, tableState) => {
            switch (action) {
              case "changeRowsPerPage":
                pageSizeChangeHandler(tableState.rowsPerPage);
                pageChangeHandler(1);
                break;
              case "changePage":
                pageChangeHandler(tableState.page + 1);
                break;
            }
          },
        }}
      />
    </div>
  );
};

export default Account;

function SearchSection({
  searchHandler,
  resetHandler,
  isSearching,
}: {
  searchHandler: (str: string) => void;
  resetHandler: () => void;
  isSearching: boolean;
}) {
  const [query, setQuery] = useState("");
  function submitHandler(e: any) {
    e.preventDefault();
    searchHandler(query);
  }
  useEffect(() => {
    if (!isSearching) {
      setQuery("");
    }
  }, [isSearching]);

  return (
    <div className="flex items-center justify-between w-full">
      <Link
        to="create"
        className="block px-4 py-2 my-4 text-white bg-black w-fit"
      >
        <Add />
      </Link>
      <div className="flex gap-x-3">
        <form onSubmit={submitHandler} className="flex items-stretch gap-x-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-1 py-2 border"
            type="text"
            placeholder="Search"
          />
          <button type="submit" className="px-3 text-white bg-black">
            Search
          </button>
        </form>
        {isSearching && (
          <button
            onClick={resetHandler}
            className="px-3 text-black border border-black"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
