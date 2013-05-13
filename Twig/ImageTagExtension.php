<?php

namespace Palap\ImageTagBundle\Twig;

use Twig_Environment;

class ImageTagExtension extends \Twig_Extension
{
    /**
     * @var \Twig_Environment
     */
    private $environment;

    /**
     * @param \Twig_Environment $environment
     */
    public function initRuntime(Twig_Environment $environment)
    {
        $this->environment = $environment;
    }

    /**
     * Get Twig Functions
     *
     * @return array
     */
    public function getFunctions()
    {
        return array(
            'imageTag' => new \Twig_Function_Method($this, 'imageTag', array('is_safe' => array('html'))),
            'setImageTag' => new \Twig_Function_Method($this, 'setImageTag', array('is_safe' => array('html')))
        );
    }

    /**
     * imageTag
     *
     * @param $imagePath
     * @param $scope
     * @param null $customControllerRoute
     * @param string $alt
     *
     * @return mixed
     */
    public function imageTag($imagePath, $scope, $alt = 'image', $customControllerRoute = null) {

        return $this->environment->render('PalapImageTagBundle:ImageTag:imagetag.html.twig', array(
            'imagePath' => $imagePath,
            'scope' => $scope,
            'customControllerRoute' => $customControllerRoute,
            'alt' => $alt
        ));
    }

    /**
     * setImageTag
     *
     * @param $imagePath
     * @param $scope
     * @param null $customControllerRoute
     * @param string $alt
     *
     * @return mixed
     */
    public function setImageTag($imagePath, $scope, $alt = 'image', $customControllerRoute = null) {

        return $this->environment->render('PalapImageTagBundle:ImageTag:setimagetag.html.twig', array(
            'imagePath' => $imagePath,
            'scope' => $scope,
            'customControllerRoute' => $customControllerRoute,
            'alt' => $alt
        ));
    }

    /**
     * Get Name
     *
     * @return string
     */
    public function getName()
    {
        return 'image_tag_extension';
    }
}