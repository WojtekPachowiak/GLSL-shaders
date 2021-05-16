// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float Circle(vec2 pos,float sharpness, float radius, vec2 coord){
    return smoothstep(1.-sharpness +radius, radius, distance(coord-pos,vec2(0.)));
}

vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = st- vec2(0.50,0.50);
    st = rotate(st,u_time*3.224);
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    color = vec3(Circle(vec2(0.120,-0.120),0.892,0.224,st),Circle(vec2(0.140,0.100),0.892,0.136,st),Circle(vec2(-0.050,-0.040),0.892,0.192,st));
    vec2 posOff = vec2(0.180,0.200);
    vec3 color2 = vec3(Circle(vec2(-0.370,0.120)+posOff,0.892,0.408,st),Circle(vec2(-0.430,-0.350)+posOff,0.892,0.448,st),Circle(vec2(0.230,-0.240)+posOff,0.892,0.512,st));
    color2 = color + color2*0.148;

    gl_FragColor = vec4(color2,1.0);
}