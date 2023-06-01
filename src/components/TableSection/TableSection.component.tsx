//libs
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
//contexts
import { QueryContext } from "../../contexts/query.context";
import { QueryContextType } from "../../types";
import "react-loading-skeleton/dist/skeleton.css";
//components
import { Table } from "./Table.component";
import { TableLoader } from "./Loader/TableLoader.component";

export const TableSection = () => {
  const limit = 10;
  const { isDbLoading } = useContext(QueryContext) as QueryContextType;

  return (
    <section className="container flex flex-col px-7 sm:px-4 mb-4">
      <AnimatePresence>
        {!isDbLoading ? (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Table />
          </motion.div>
        ) : (
          <motion.div
            key="table-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TableLoader limit={limit} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
