// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float Line(float pos, float thickness, float coord){
    float line = step(thickness + pos, coord) + step(1. - pos, 1. - coord);
    return line;
}

float Rect(vec2 pos, float length, float height, vec2 coord){
    float rect= step(pos.x,coord.x) * step(pos.y,coord.y) * step(1.-length - pos.x, 1.0-coord.x) * step(1.-height - pos.y,1.0-coord.y);
    return rect;
}

float lines[7];
void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

//////////////
    
    // HORIZONTAL
    float line_thickness = 0.02;
    lines[0] = Line(0.068,line_thickness,st.x);
    lines[1] = Line(0.2,line_thickness,st.x);
    lines[2] = Line(0.748,line_thickness,st.x);
    lines[3] = Line(0.940,line_thickness,st.x);
    //VERTICAL
    lines[4] = Line(0.8,line_thickness,st.y);
    lines[5] = Line(0.6,line_thickness,st.y);
    lines[6] = Line(0.068,line_thickness,st.y);

    float line_mask = 1.;
	for (int i = 0; i < 7;i++){
        line_mask *= lines[i];
    }
    
    
//////////////
    vec3 white_color = vec3(1.000,0.996,0.928);

    float rw_mask = Rect(vec2(0.000,-0.010),0.2,0.61,st);

	float rr = Rect(vec2(0.000,0.620),0.2,0.396,st);
	float ry = Rect(vec2(0.940,0.600),0.1,0.444,st);
	float rb = Rect(vec2(0.75,0.0),0.25,0.068,st);

    float boxes_mask =rr + ry +rb;
    vec3 boxes_color = vec3(rr+ry,ry,rb);
	
//////////////

	color = mix(white_color,boxes_color, boxes_mask);
    color = mix(vec3(line_mask),color, line_mask);
    color = mix(color, white_color,rw_mask);


    gl_FragColor = vec4(color,1.0);
}