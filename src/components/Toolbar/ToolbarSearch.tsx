import React, { useState } from "react";
import Gallery, { Photo, ClickHandler } from "react-photo-album";

import useUnsplashAPI, { Image } from "../../hooks/useUnsplashAPI";
import { ReactComponent as Search } from "../../assets/search2.svg";
import { ReactComponent as Loader } from "../../assets/loader.svg";
import useStore from "../../hooks/useStore";
import { observer } from "mobx-react";

export const ToolbarSearch: React.FC = observer(() => {
  const {
    imageStore,
    UIStore,
    searchStore: search,
  } = useStore();
  const {
    loadImages,
    goToNextPage,
    goToPrevPage,
  } = useUnsplashAPI();
  const [inputValue, setInputValue] = useState("");

  const handleImageClick: ClickHandler = async (props) => {
    const imageUrl = search.images[props.index].url_regular;
    await imageStore.load(imageUrl);
    UIStore.closeToolbar();
  };

  const galleryPhotoProp: Photo[] = search.images.map(
    (image: Image) => {
      return {
        width: image.width,
        height: image.height,
        src: image.url,
      };
    },
  );

  return (
    <div className="toolbar__content unsplash-gallery__container">
      <div className="unsplash-gallery custom-scrollbar">
        <form
          className="unsplash-gallery__form"
          onSubmit={
            event => {
              loadImages(inputValue);
              event.preventDefault();
            }
          }
        >
          <button
            type="submit"
            className="unsplash-gallery__submit-btn"
          >
            <Search />
          </button>
          <input
            className="unsplash-gallery__input"
            type="text"
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
            placeholder="What are you looking for?"
          />
        </form>
        {search.images.length && !search.isError ? (
          <div className="unsplash-gallery__navbar">
            {search.currentPage !== 1 && (
              <button
                className="unsplash-gallery__prev-btn"
                onClick={goToPrevPage}
              >
                Previous
              </button>
            )}
            {search.currentPage !== search.totalPages && (
              <button
                className="unsplash-gallery__next-btn"
                onClick={goToNextPage}
              >
                Next
              </button>
            )}
          </div>
        ) : null}
        {search.isError && (
          <div className="unsplash-gallery__error">
            Something went wrong ...
          </div>
        )}
        {search.isLoading
          ? <div className="unsplash-gallery__loader"><Loader /></div>
          : search.images.length
            ? (
              <div className="unsplash-gallery__photos">
                <Gallery photos={galleryPhotoProp} onClick={handleImageClick} layout={"columns"} />
              </div>
            )
            : !search.isError
              ? <div className="unsplash-gallery__error">No results</div>
              : null
        }
      </div>
    </div>
  );
});

export default ToolbarSearch;