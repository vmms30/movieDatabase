
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import Link

const BreadcrumbsComponent = ({ movieTitle }) => {
  const navigate = useNavigate(); // Keep for the "Go Back" example if you were to add it

  return (
    <Breadcrumb listProps={{ className: "bg-dark p-2 rounded" }}>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}> {/* Use linkAs and linkProps */}
        Home
      </Breadcrumb.Item>
      {/* 
        Example if you wanted a "Previous Page" breadcrumb item:
        <Breadcrumb.Item onClick={() => navigate(-1)} linkProps={{role: 'button'}}>
          Previous Page 
        </Breadcrumb.Item>
        Note: For onClick to work well with Breadcrumb.Item, you might need to style it to look like a link,
        or ensure it has linkProps={{role: 'button'}} for accessibility.
        Alternatively, if you know the path to the "previous" meaningful page (e.g., /search), you could use linkAs={Link} as well.
      */}
      <Breadcrumb.Item active className="text-light">
        {movieTitle || 'Movie Details'}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadcrumbsComponent;