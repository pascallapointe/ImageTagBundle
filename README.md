ImageTagBundle
---



The ImageTagBundle allows you to add tags to your images. Tags takes the form of a box of a different color followed by a label. Tags are stored in your database every times you make a change on it.

To use it, the bundle provide:
	
* A twig function for creating tags
* A twig function to display images with their tags.


**Note:**
* This bundle has been tested on Firefox, Chrome, Safari and Symfony 2.0.x
* Thank you to share all issues regarding this bundle

## Installation

Using **deps** file with Symfony 2.0.x :

    [PalapImageTagBundle]
        git=https://github.com/pascallapointe/ImageTagBundle.git
        target=/bundles/Palap/ImageTagBundle

Subsequently add the following line to **AppKernel.php** :

    new Palap\ImageTagBundle\PalapImageTagBundle(),
    
## Simple usage

#### Adding tags
 
    {{ setImageTag (
        'image/IMG001.jpg',
        'theScope',
        'optional - Image Alt property'
    ) }}
   
**Explanation :**
* The first parameter is the  **path** of the picture, it is possible to use any twig function returning a path as [GregwarImageBundle](https://github.com/Gregwar/ImageBundle) functions.
* The second parameter will be used as **Scope** to allow the js script distinguishes different images.
* Tags associated with images considering the file name, the width and height of the image.
* Creating tags is secure according to the following role : `IS_AUTHENTICATED_FULLY`, you can change it by extending the bundle controller.

#### Display tags

    {{ imageTag (
        'image/IMG001.jpg',
        'theScope',
        'optional - Image Alt property'
    ) }}
        
## Usage with custom controller

It is possible to use a controller with twig custom functions to modify the way the script will save the tags.

### Adding tags - custom controller

    {{ setImageTag (
        entity.filePath,
        'theScope',
        'Not optional - Image Alt property',
        path('MyCustomControllerRoute', {'id':entity.id, 'fieldName':'file', 'otherUsefulParameters':parameters})
    ) }}
    
**Explanation :**
* MyCustomControllerRoute is the route used by the Ajax request
* You **must definitely** specify a parameter in your way, even if it is a decoy to initiate the "*query string*"
* The query string added to your *Route* by the script **js** is as follows : 
    
    ```
    '&init=' + init + '&width=' + imageWidth + '&height=' + imageHeight
    + '&htmlcontent=' + encodeURIComponent($('.tagz', context).html())
    ```
    
* **init** is equal to true on the first query, used for initialization purpose
* **htmlcontent** contains tags to save

### Display tags - custom controller

    {{ imageTag (
        entity.filePath,
        'theScope',
        'Not optional - Image Alt property',
        path('MyCustomControllerRoute', {'id':entity.id, 'fieldName':'file', 'otherUsefulParameters':parameters})
    ) }}
