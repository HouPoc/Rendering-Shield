# Rendering Shield 
## Final Project of CS457 _(Computer Graphic Shaders)_ at Oregon State University.
### Project Description
 This project was inspired by movie, _Captain America: Civil War_ (2016). In this [fight scene](https://youtu.be/T4jV1NQuapA?t=78), Black Panther made a huge scratch on Captain America's shield known as its indestructible. It was the first time I saw that the shield was scratched. I decided to reproduce that effect with shaders in OpenGL to commemorate that moment.
 
 The whole project contains three parts: **Build Shield**, **Made Scratches**, and **Add Lighting**.
  1. **Build Shield** 
  
     The raw shield object was imported from external obj file without any color on it. The first thing I did was to paint color on the shield in fragment shader. I used radius of the shield as parameters to paint the red color and math equations to draw the center star.  
     
  2. **Made Scratches**
  
     The scratches on the shield was generated with noise functions and trigonometric functions. The core idea was modifying surface normal vectors to [bump mapped](https://en.wikipedia.org/wiki/Bump_mapping) the shadow on the shield without change the overall topology.
     
  3. **Add Lighting**
     
     After computing the normal, I added a light source into the scene and use [BRDF equation](https://en.wikipedia.org/wiki/Bidirectional_reflectance_distribution_function) to compute color for each fragment based on generated surface normal. There are four more parameters used here: Ambient Coefficient, Diffuse Coefficient, Secular Coefficient, and Shininess. The lighting source's position can be adjusted, either.
### Rendered Result

<p float="left">
   <img src="/rendered result/angle_1.bmp" alt="render result" width="200" height="200" hspace="30">
   <img src="/rendered result/angle_2.bmp" alt="render result" width="200" height="200" hspace="30">
   <img src="/rendered result/angle_3.bmp" alt="render result" width="200" height="200" hspace="30">
</p> 

### Related Knowledge

 - **GLSL**
 - **Computer Graphic**
 - **Trigonometric Function**
 - **Vector Calculus**
 
### How To
  This project can only work with `Windows`. To demo this project, you firest need to run `glman/glman.exe` and load the main GILB file `src/Shield.glib`. [_glman_](http://web.engr.oregonstate.edu/~mjb/WebMjb/Papers/sigcse07.pdf) is a teaching-ware developed by Professor Mike Bailey and Steve Cunningham in 2006, and it is totally no-harm. After loading `src/Shield.glib`, _glman_ will create a main display window and an user interface with several sidebars that control parameters in this program. You can play with them to see different effects. Note that `src/Shield.vert` and `src/Shield.frag` are vertex shader and fragment shader used in this program, be free to make some changes.  
  
  [GLMAN Documentation](http://web.engr.oregonstate.edu/~mjb/cs557/Handouts/glman.pdf)
  
  [GLSL Documentation](https://www.khronos.org/registry/OpenGL/specs/gl/GLSLangSpec.3.30.pdf)

