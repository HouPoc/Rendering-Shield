in vec3 vVertex;
in vec4 vColor;
in vec3 vNormal;
in vec3 vLight;
in vec3 vEye;
in vec3 vMCposition;

uniform float uShininess;
uniform float uKa;
uniform float uKd;
uniform float uKs;
uniform float Timer;
uniform bool uTimer;
uniform float uTime;
uniform float uCfactor;
uniform float uAngle;
uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform float uX;
uniform float uY;

uniform sampler3D Noise3; 

const float PI = 3.1415926;
// X=Y=30
// 3:3:3:4->3.65:3.65:3.65:4.8->7.3:7.3:7.3:9.6
// blue 0.04 0.32 1.
// Red 1.0 0.16 0.18

// Anistopic Lighitng
// Timer / Animation 
// Bump Mapping 
// Mix Color
// Noise
// Matrix Rotation
// Mathmatical Way to create star 

void
main( )
{
	//Input Vectors
	vec3 Normal = normalize(vNormal);
	vec3 Light = normalize(vLight);
	vec3 Eye = normalize(vEye);
	float x = vVertex.x + 1.6535;
	float y = vVertex.y - 1.4645;
	float z = vVertex.z;
	float d = x*x + y*y;
	//Material Color and Light Color
	vec4 mColor = vColor;
	vec4 lColor = vec4 (1., 1., 1. ,1.);
	//Discard Outer irregular 
	//if (d > 900.){
		//discard;
	//}
	// Red Color
	if (d < 1089.&&d > 660.49 || d < 285.61&&d > 92.16){
		mColor = vec4 (1., 0.16, 0.18, 1.);
	}
	// Inner Blue and Center Star
	else if (d < 92.16) {
		mColor = vColor;
		float vertex_a_x = cos((18./180.)*PI)*9.6;
		float vertex_a_y = sin((18./180.)*PI)*9.6;
		float vertex_b_x = cos((90./180.)*PI)*9.6;
		float vertex_b_y = sin((90./180.)*PI)*9.6;
		float vertex_c_x = cos((162./180.)*PI)*9.6;
		float vertex_c_y = sin((162./180.)*PI)*9.6;
		float vertex_d_x = cos((234./180.)*PI)*9.6;
		float vertex_d_y = sin((234./180.)*PI)*9.6;
		float vertex_e_x = cos((306./180.)*PI)*9.6;
		float vertex_e_y = sin((306./180.)*PI)*9.6;
		//float slope_db = (vertex_b_y-vertex_d_y) / (vertex_b_x-vertex_d_x);
		float slope_ce = (vertex_e_y-vertex_c_y) / (vertex_e_x-vertex_c_x);
		float inter_ce_y = -9.2 /(cos(36./180.*PI)+sin(36./180.*PI)*tan(72./180*PI));
		float slope_da = (vertex_a_y-vertex_d_y) / (vertex_a_x-vertex_d_x);
		float inter_da_y = inter_ce_y;
		float slope_be = (vertex_e_y-vertex_b_y) / (vertex_e_x-vertex_b_x);
		float inter_be_y = vertex_b_y;
		if (abs(x)*slope_be + inter_be_y < y || abs(x)*slope_ce + inter_ce_y > y){
			if (y > vertex_a_y || abs(x)*slope_da + inter_da_y > y){
			mColor = vec4 (0.04, 0.32, 1., 1.);
			}
		}	
	}
	//Scratches
	if (x < -25.+Timer*uTime*50. || !uTimer) {
		vec4 nvx = texture( Noise3, uNoiseFreq*vMCposition);
		float modifier = uNoiseAmp * (nvx.r + nvx.g + nvx.b + nvx.a  -  2.);
		// Scratch 1 at the orignal point
		if (y + modifier> 0.001*x*x-0.6 && y + modifier < -0.001*x*x+0.6){
			float n_y = Normal.y;
			float n_z = Normal.z;
			if (y + modifier * -1.> -0.001*x*x+0.3){
				float cos_angle = cos(uAngle/180.*PI); 
				float sin_angle = sin(uAngle/180.*PI);
				Normal.y = n_y*cos_angle - n_z*sin_angle;
				Normal.z = n_y*sin_angle + n_z*cos_angle;
				mColor = vec4 (0.3, 0.3, 0.3, 1.);
			}
			else if (y + modifier * -1. < 0.001*x*x-0.3){
				float cos_angle = cos(-uAngle/180.*PI); 
				float sin_angle = sin(-uAngle/180.*PI);
				Normal.y = n_y*cos_angle - n_z*sin_angle;
				Normal.z = n_y*sin_angle + n_z*cos_angle;
				mColor = vec4 (0.3, 0.3, 0.3, 1.);
			}
			else {
				mColor = vec4 (0.1, 0.1, 0.1, 1.);
			}
		}
		// Scratch 2
		if (y + modifier> 0.002*x*x+10. && y + modifier < -0.002*x*x+11. ){
			float n_y = Normal.y;
			float n_z = Normal.z;
			if (y + modifier * -2.5> -0.002*x*x+10.7){
				float cos_angle = cos(uAngle/180.*PI); 
				float sin_angle = sin(uAngle/180.*PI);
				Normal.y = n_y*cos_angle - n_z*sin_angle;
				Normal.z = n_y*sin_angle + n_z*cos_angle;
				mColor = vec4 (0.3, 0.3, 0.3, 1.);
			}
			else if (y + modifier * -2.5 < 0.002*x*x+10.3){
				float cos_angle = cos(-uAngle/180.*PI); 
				float sin_angle = sin(-uAngle/180.*PI);
				Normal.y = n_y*cos_angle - n_z*sin_angle;
				Normal.z = n_y*sin_angle + n_z*cos_angle;
				mColor = vec4 (0.3, 0.3, 0.3, 1.);
			}
			else {
				mColor = vec4 (0.1, 0.1, 0.1, 1.);
			}
			
		}
		// Scratch 3
		if (y + modifier> 0.002*x*x-11. && y + modifier < -0.002*x*x-10. ){
			float n_y = Normal.y;
			float n_z = Normal.z;
			if (y + modifier * -2.5> -0.002*x*x-10.3){
				float cos_angle = cos(uAngle/180.*PI); 
				float sin_angle = sin(uAngle/180.*PI);
				Normal.y = n_y*cos_angle - n_z*sin_angle;
				Normal.z = n_y*sin_angle + n_z*cos_angle;
				mColor = vec4 (0.3, 0.3, 0.3, 1.);
			}
			else if (y + modifier * -2.5 < 0.002*x*x-10.7){
				float cos_angle = cos(-uAngle/180.*PI); 
				float sin_angle = sin(-uAngle/180.*PI);
				Normal.y = n_y*cos_angle - n_z*sin_angle;
				Normal.z = n_y*sin_angle + n_z*cos_angle;
				mColor = vec4 (0.3, 0.3, 0.3, 1.);
			}
			else {
				mColor = vec4 (0.1, 0.1, 0.1, 1.);
			}
			
		}
	}
	//Light Calculation
	vec4 uColor = mix(mColor, lColor, uCfactor);
	vec4 ambient = uKa * uColor;
	//float diff = max( dot(Normal,Light), 0. );
	//vec4 diffuse = uKd * diff * uColor;
	vec3 Tanget = vec3(0.,1.,0.);
	float dif = dot(Tanget, Normal);
	Tanget = normalize(Tanget - dif*Normal);
	float dl = dot(Tanget, Light);
	vec4 diffuse = uKd*sqrt(1.-dl*dl)*uColor;
	/*float s = 0.;
	if( dot(Normal,Light) > 0. ) // only do specular if the light can see the point
	{
		vec3 ref = normalize( 2. * Normal * dot(Normal,Light) - Light );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec4 specular = uKs * s * lColor;*/
	float de = dot(Tanget,Eye);
	vec4 specular = uKs * lColor * pow(dl*de+sqrt(1.-dl*dl)*sqrt(1.-de*de), uShininess);
	vec3 combined_color = vec3 (ambient.rgb + diffuse.rgb + specular.rgb);
	gl_FragColor = vec4( combined_color, 1. );
	//gl_FragColor = vec4 (1.,1.,1.,1.);
}
