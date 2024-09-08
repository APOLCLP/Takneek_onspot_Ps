#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float triangle(vec2 st, vec2 p0, vec2 p1, vec2 p2) {
    vec3 v0 = vec3(p1 - p0, 0.0);
    vec3 v1 = vec3(p2 - p1, 0.0);
    vec3 v2 = vec3(p0 - p2, 0.0);
    vec3 v = vec3(st - p0, 0.0);
    return min(min(cross(v0, v).z, cross(v1, vec3(st - p1, 0.0)).z), cross(v2, vec3(st - p2, 0.0)).z);
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(1.0); //background colour
    
    //creating a triangle
    for(float i = -0.5; i<0.5; i+= 0.1){
    vec2 p1 = vec2(0.5+i, 0.6);
    vec2 p2 = vec2(0.5+i+0.15, 0.6);
    vec2 p3 = vec2(0.5+i+0.075, 0.7+i*i);
    float triVal = triangle(coord, p1, p2, p3);
     if(triVal>0.0){
        color = vec3(0.7,0.8,0.9);
    }
    }

    

    
    
    gl_FragColor = vec4(color, 1.0);

}