<?php

namespace Palap\ImageTagBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

use Palap\ImageTagBundle\Entity\ImageTag;

/**
 * Images Controller
 */
class ImageTagController extends Controller
{
    /**
     * imageTagAction
     *
     * @param Request $request
     *
     * @return Response
     *
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException
     */
    public function imageTagAction(Request $request) {

        if ($request->isXmlHttpRequest()) {
            $response = new Response();

            $imagePath = urldecode($request->query->get('imagepath'));
            $imageWidth = urldecode($request->query->get('width'));
            $imageHeight = urldecode($request->query->get('height'));

            $fileName = preg_replace('#([^/]*.)+$#i','$1',$imagePath);

            $em = $this->getDoctrine()->getEntityManager();

            $entity = $em->getRepository('PalapImageTagBundle:ImageTag')->findOneBy(array('filename' => $fileName));

            if ($entity) {

                // True if image width and heigh == to 0 cause there's no way to check image width/height on Gregwar cached image ...
                if (($entity->getWidth() == $imageWidth && $entity->getHeight() == $imageHeight) || ($imageWidth == 0 && $imageHeight == 0)) {

                    if ($request->query->get('init') == 'true') {

                        $content = $entity->getTags();

                        $response->setContent($content);

                        return $response;

                    } elseif ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {

                        $entity->setTags($request->query->get('htmlcontent'));
                        $em->flush();
                    }
                } elseif ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {

                    $em->remove($entity);
                    $em->flush();
                }

            } elseif ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                if ($request->query->get('init') == 'false') {

                    $entity = new ImageTag();
                    $entity->setFilename($fileName);
                    $entity->setWidth($imageWidth);
                    $entity->setHeight($imageHeight);
                    $entity->setTags($request->query->get('htmlcontent'));

                    $em->persist($entity);
                    $em->flush();
                }
            }

            $response->setContent($request->query->get('htmlcontent'));

            return $response;
        } else {
            throw new HttpException(403);
        }
    }
}