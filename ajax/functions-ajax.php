<?php
function boilerplate_ajax_articles()
{
    /**
     * @var $posts - wpquery
     * @var $offset
     * @var $postsPerPage
     * @var $paged
     */
    ob_start();
    include 'demo-articles.php';
    $data = ob_get_contents();
    ob_end_clean();

    $total = $posts->found_posts;
    $currentItemsContained = $offset + $posts->post_count;
    $itemsPerPage = $postsPerPage;
    $numberOfPages = ceil($total / $itemsPerPage);

    return compact('total', 'currentItemsContained', 'itemsPerPage', 'numberOfPages', 'data', 'paged');
}

function boilerplate_ajax($request)
{

    if (isset($_GET['ajax'])) {

        if ($_GET['ajax'] == 'articles') {
            $result = boilerplate_ajax_articles();
        } else {
            die('Bad ajax request');
        }

        // all products shown on previous pages and this page
        $response = new \stdClass();
        $response->loadMoreType = $_GET['ajax'];
        $response->total = (int)$result['total'];
        $response->currentItemsContained = (int)$result['currentItemsContained'];
        $response->itemsPerPage = (int)$result['itemsPerPage'];
        $response->currentPage = (int)$result['paged'];
        $response->numberOfPages = (int)$result['numberOfPages'];
        $response->dataView = $result['data'];

        header('Content-Type: application/json');
        echo json_encode($response);

        die();
    }

    return $request;
}
add_filter('request', 'boilerplate_ajax');
?>