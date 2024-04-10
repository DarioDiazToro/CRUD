import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-buttons/render-buttons";
import { modal, renderModal } from "./presentation/render-modal/render-modal";
import { renderTable } from "./presentation/render-table/renderTable";
import usersStore from "./store/users-store";
import { saveUser } from "./uses-cases/save-user";

/**
 *
 * @param {HTMLDivElement} element
 */
export const UserApp = async (element) => {
  element.innerHTML = "Loading...";
  await usersStore.loadNextPage();
  usersStore.loadPreviusPage();
  element.innerHTML = "";
  renderTable(element);
  renderButtons(element);
  renderAddButton(element);
  renderModal(element, async (userLike) => {
    const user = await saveUser(userLike);
    usersStore.onUserChanged(user);
    renderTable();
  });
};
