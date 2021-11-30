import React from "react";
import "../index.css";
import Header from "../components/header";
import { HomeActions } from "../redux/actions";
import { store } from "../redux";
import Loader from "../components/loader";
import { connect } from "react-redux";

class Notifications extends React.Component {
  componentDidMount() {
    this.props.loadData();
  }
  render() {
    const lowStock = this.props.data.lowStock ? this.props.data.lowStock : [];
    const outOfStock = this.props.data.outOfStock
      ? this.props.data.outOfStock
      : [];
    return (
      <div>
        <Header />
        {/* main content container */}
        <div className="pt-20">
          <h1 className="ml-10 text-3xl font-bold mb-4">Notifications</h1>
          <div className="flex flex-col items-center justify-center">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className=" shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 w-full">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Medicine
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">order this item</span>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">done</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {outOfStock.map((notification) => (
                        <tr key={notification.email}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={notification.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {notification.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-error text-red-100">
                              Out of stock
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="/delivery">
                              <button className="text-indigo-600 hover:text-indigo-900 rounded-lg border py-3 px-8 flex">
                                Order this item
                              </button>
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900 rounded-lg border py-3 px-8"
                            >
                              done
                            </a>
                          </td>
                        </tr>
                      ))}
                      {lowStock.map((notification) => (
                        <tr key={notification.email}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={notification.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {notification.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="p-2 inline-flex text-xs leading-5 font-semibold text-white rounded-full  bg-blue-500">
                              Low stock
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="/delivery">
                              <button
                                href="/delivery"
                                className="text-indigo-600 hover:text-indigo-900 rounded-lg border py-3 px-8 flex"
                              >
                                Order this item
                              </button>
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900 rounded-lg border py-3 px-8"
                            >
                              done
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.home.home,
    isLoading: state.home.isLoading,
    isError: state.home.isError,
    maxLimit: state.auth.user.user.maxLimit,
  };
};

const mapDispatchToProps = (dispatch) => {
  const state = store.getState();
  return {
    loadData: () => dispatch(HomeActions.read(state.auth.user.token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
