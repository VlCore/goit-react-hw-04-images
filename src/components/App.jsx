import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { feachPictures } from 'Api/Api';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import { ModalImg } from './App.styled';
import { Loader } from './Loader/Loader';
import { toast } from 'react-toastify';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [per_page] = useState(18);
  const [photos, setPhotos] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [bigImgUrl, setBigImgUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery) return;

      try {
        setShowLoader(true);
        const data = await feachPictures({ page, per_page, q: searchQuery });

        if (!data.totalHits) {
          toast.warn(
            'Sorry, but nothing was found for your request. Change the request and try again.'
          );
          return;
        }
        setTotalHits(data.totalHits);
        setPhotos(prevPhotos => (page === 1 ? data.hits : [...prevPhotos, ...data.hits]));
        setShowLoadMore(page < Math.ceil(data.totalHits / per_page));
      } catch {
        toast.error('Oops!!! An error occurred. Please try again.');
        console.log('error');
      } finally {
        setShowLoader(false);
      }
    };

    fetchData();
  }, [page, per_page, searchQuery]);

  const handleSearchForm = query => {
    if (!query) {
      toast.warn('Please enter a request!');
      return;
    }

    if (searchQuery !== query) {
      setPhotos([]);
      setSearchQuery(query);
      setPage(1);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleShowBigImg = url => {
    setBigImgUrl(url);
  };

  const closeModal = () => {
    setBigImgUrl('');
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchForm} />
      <ImageGallery photos={photos} onShowBigImg={handleShowBigImg} />
      {showLoader && <Loader />}
      {showLoadMore && <Button onLoadMore={handleLoadMore} />}
      {bigImgUrl && (
        <Modal closeImgModal={closeModal}>
          <ModalImg src={bigImgUrl} alt={searchQuery} />
        </Modal>
      )}
    </>
  );
}

export default App;
