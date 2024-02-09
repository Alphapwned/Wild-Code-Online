import React, { useState } from "react";
import Layout from "components/common/layouts/Layout";
import SearchBar from "components/common/SearchBar";
import "styles/SearchFilePage.scss";
import GridFileSearch from "components/common/GridFileSearch";
import { GET_FILES_QUERY } from "graphql/queries/GET_FILES_QUERY";
import { useQuery } from "@apollo/client";

type File = {
  id: number;
  filename: string;
  content?: string;
  createdAt: string;
  isPublic: boolean;
  language: {
    name: string;
  };
};

const SearchFilePage = () => {
  const { data: getFilesData, refetch } = useQuery(GET_FILES_QUERY, {
    variables: { filter: { isPublic: false } },
  });

  const [value, setValue] = useState<string>("");

  const [filteredTextValue, setFilteredTextValue] = useState<string>("");

  return (
    <Layout>
      <div className="container-global">
        <div className="container-search">
          <SearchBar
            value={value}
            setValue={setValue}
            setFilterValue={setFilteredTextValue}
            valueFilter={filteredTextValue}
          />
        </div>
        <div className="container-listing-files">
          <GridFileSearch
            files={getFilesData?.getFiles || []}
            value={value}
            valueFilter={filteredTextValue}
            refetch={refetch}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SearchFilePage;
